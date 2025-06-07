/*
Here's how to add a plugin to CKEditor 4 in a React application:
1. Install the necessary packages:
Code

   npm install ckeditor4-react
2. Include the CKEditor component:
Code

   import React from 'react';
   import { CKEditor } from 'ckeditor4-react';

   function MyEditor() {
     return (
       <CKEditor
         initData="<p>Initial content.</p>"
         onInstanceReady={(event) => {
           console.log('Editor is ready', event);
         }}
       />
     );
   }

   export default MyEditor;
3. Add the plugin:
Download the plugin: Obtain the plugin files from the CKEditor Add-ons Repository or create your own.
Place the plugin: Put the plugin files in a directory accessible to your project, for example, public/ckeditor/plugins/myplugin.
Configure extraPlugins: In the CKEditor component, use the config prop to specify the plugin.
Code

   <CKEditor
     initData="<p>Initial content.</p>"
     config={{
       extraPlugins: 'myplugin', // Plugin name
       // other configurations
     }}
   />
For external plugins: Use the CKEDITOR.plugins.addExternal method.
Code

    <CKEditor
        initData="<p>Initial content.</p>"
        config={{
          extraPlugins: 'myplugin',
          // other configurations
        }}
        onBeforeLoad={ (CKEDITOR) => {
             CKEDITOR.plugins.addExternal('myplugin', '/ckeditor/plugins/myplugin/plugin.js', '');
        }}
    />
4. Plugin Development:
If you are creating your own plugin, ensure it is compatible with CKEditor 4's API. Refer to the official documentation on plugin development.
Use editor.ui.addButton to create toolbar buttons for your plugin.
5. Important Considerations:
Advanced Content Filter (ACF):
If your plugin inserts elements not allowed by default, configure config.allowedContent or integrate with ACF.
Plugin dependencies:
Ensure all plugin dependencies are met. The online builder can automatically resolve these.
Local vs. CDN:
When loading plugins locally, ensure the paths are correctly resolved. Avoid using relative paths directly from node_modules.
Toolbar customization:
Adjust the toolbar to include your plugin's buttons.
By following these steps, you can successfully integrate custom or third-party plugins into your CKEditor 4-based React application.

https://codesandbox.io/examples/package/ckeditor4-react
https://ckeditor.com/cke4/addons/plugins/all
https://ckeditor.com/docs/ckeditor4/latest/examples/react.html#/state-lifting

https://ckeditor.com/cke4/addon/codemirror
https://codemirror.net/examples/bundle/

-- 集成文件管理
https://ckeditor.com/docs/ckeditor4/latest/guide/dev_file_browse_upload.html
https://ckeditor.com/docs/ckeditor4/latest/guide/dev_dialog_add_file_browser.html

*
*
*
* */