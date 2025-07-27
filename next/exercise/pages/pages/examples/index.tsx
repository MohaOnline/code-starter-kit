import React from 'react'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

type RouteLink = {
  name: string;
  path: string;
  fullPath: string;
};

type ExampleDirectory = {
  name: string;
  path: string;
  links: RouteLink[];
};

const ExamplesIndex = ({ directories }: {
  directories: ExampleDirectory[]
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Examples</h1>

      {directories.map((directory) => (
        <div key={directory.path} className="mb-10">
          <h2 className="text-xl font-bold mt-6 mb-4 border-b pb-2">
            {directory.name}
          </h2>

          <div className="flex flex-wrap gap-4">
            {directory.links.map((link) => (
              <Link
                href={link.fullPath}
                key={link.path}
                className="p-4 border rounded-lg hover:bg-gray-100 transition-colors duration-200 w-64"
              >
                <div className="text-lg font-medium">{link.name}</div>
                <div className="text-sm text-gray-500 mt-1">{link.path}</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps () {
  const examplesDirectory = path.join(process.cwd(), 'pages/pages/examples')
  const directories: ExampleDirectory[] = []

  // Process the root /examples directory first
  const rootLinks = getRouteLinksForDirectory(examplesDirectory, '')
  if (rootLinks.length > 0) {
    directories.push({
      name: 'Root',
      path: '/',
      links: rootLinks,
    })
  }

  // Get all subdirectories
  const entries = fs.readdirSync(examplesDirectory, { withFileTypes: true })

  // Process subdirectories
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subdirPath = path.join(examplesDirectory, entry.name)
      const relativePathForLinks = `/${entry.name}`

      const links = getRouteLinksForDirectory(subdirPath, relativePathForLinks)

      if (links.length > 0) {
        directories.push({
          name: entry.name,
          path: relativePathForLinks,
          links,
        })
      }

      // Process nested directories recursively
      processNestedDirectories(subdirPath, relativePathForLinks, entry.name,
        directories)
    }
  }

  return {
    props: {
      directories,
    },
  }
}

/**
 * Get all valid route links for a specific directory according to Pages Router rules
 */
function getRouteLinksForDirectory (
  dirPath: string, routePrefix: string): RouteLink[] {
  const links: RouteLink[] = []
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  // Check for index file which would make the directory itself accessible
  const hasIndexFile = entries.some(entry =>
    !entry.isDirectory() &&
    (entry.name === 'index.tsx' || entry.name === 'index.jsx' || entry.name ===
      'index.js'),
  )

  // If the directory has an index file, add it as a route
  if (hasIndexFile && routePrefix) {
    links.push({
      name: path.basename(routePrefix),
      path: routePrefix,
      fullPath: `/pages${routePrefix}`,
    })
  }

  // Add routes for individual files (except layout, index and hidden files)
  for (const entry of entries) {
    if (!entry.isDirectory() &&
      !entry.name.startsWith('_') &&
      entry.name !== 'index.tsx' &&
      entry.name !== 'index.jsx' &&
      entry.name !== 'index.js' &&
      (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx') ||
        entry.name.endsWith('.js'))) {

      const pageName = entry.name.replace(/\.(tsx|jsx|js)$/, '')
      const pagePath = `${routePrefix}/${pageName}`

      links.push({
        name: pageName,
        path: pagePath,
        fullPath: `/pages${pagePath}`,
      })
    }
  }

  return links
}

/**
 * Recursively process nested directories to find all valid routes
 */
function processNestedDirectories (
  dirPath: string,
  routePrefix: string,
  parentName: string,
  directories: ExampleDirectory[],
) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const nestedDirPath = path.join(dirPath, entry.name)
      const nestedRoutePrefix = `${routePrefix}/${entry.name}`
      const nestedDirName = `${parentName}/${entry.name}`

      const links = getRouteLinksForDirectory(nestedDirPath, nestedRoutePrefix)

      if (links.length > 0) {
        directories.push({
          name: nestedDirName,
          path: nestedRoutePrefix,
          links,
        })
      }

      // Continue recursion
      processNestedDirectories(nestedDirPath, nestedRoutePrefix, nestedDirName,
        directories)
    }
  }
}

export default ExamplesIndex
