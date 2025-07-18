import React from 'react';
import { ThemeToggle } from '@/app/lib/components/ThemeToggle';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

function getNestedDirectoryEntries(dirPath, basePath = '', depth = 0) {
    const entries = [];
    try {
        const items = fs.readdirSync(dirPath, { withFileTypes: true });
        const directories = items
            .filter(item => item.isDirectory())
            .sort((a, b) => a.name.localeCompare(b.name));

        for (const dir of directories) {
            const fullPath = path.join(dirPath, dir.name);
            const relativePath = basePath ? `${basePath}/${dir.name}` : dir.name;
            
            entries.push({
                name: dir.name,
                path: relativePath,
                depth: depth
            });

            // Recursively get subdirectories (limit depth to prevent infinite loops)
            if (depth < 3) {
                const subEntries = getNestedDirectoryEntries(fullPath, relativePath, depth + 1);
                entries.push(...subEntries);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error);
    }
    return entries;
}

async function getDirectoryEntries() {
    const exampleDir = path.join(process.cwd(), 'src/app/examples');
    return getNestedDirectoryEntries(exampleDir);
}

export default async function Page() {
    const entries = await getDirectoryEntries();

    return (
        <>
            <ThemeToggle />
            <h1>Examples</h1>
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Available Examples:</h2>
                {entries.length > 0 ? (
                    <ul className="space-y-1">
                        {entries.map((entry, index) => (
                            <li key={`${entry.path}-${index}`} 
                                className="flex items-center"
                                style={{ paddingLeft: `${entry.depth * 20}px` }}
                            >
                                {entry.depth > 0 && (
                                    <span className="text-gray-400 mr-2">
                                        {'└─ '}
                                    </span>
                                )}
                                <Link 
                                    href={`/examples/${entry.path}`}
                                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                                >
                                    {entry.name}
                                </Link>
                                <span className="text-xs text-gray-500 ml-2">
                                    (depth: {entry.depth})
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No examples directories found.</p>
                )}
            </div>
        </>
    );
}
