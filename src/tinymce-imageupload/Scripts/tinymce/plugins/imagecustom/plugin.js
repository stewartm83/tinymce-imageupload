/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2015 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*jshint unused:false */
/*global tinymce:true */

/**
 * imagecustom plugin that adds a toolbar button and menu item.
 */
tinymce.PluginManager.add('imagecustom', function(editor, url) {
	// Add a button that opens a window
	editor.addButton('imagecustom', {
		//text: 'Insert image',
		icon: "image",
		onclick: function() {
			// Open window
			editor.windowManager.open({
				title: 'Insert image',
				body: [
					{type: 'textbox', name: 'title', label: 'Title'}
				],
				onsubmit: function(e) {
					// Insert content when the window form is submitted
					editor.insertContent('Title: ' + e.data.title);
				}
			});
		}
	});

	// Adds a menu item to the tools menu
	editor.addMenuItem('imagecustom', {
		text: 'Insert image',
		context: 'insert',
		icon: "image",
		onclick: function() {
			// Open window with a specific url
			editor.windowManager.open({
				title: 'Insert image',
				url: url + '/dialog.html',
				width: 400,
				height: 150,
				buttons: [
					{
						text: 'Insert',
						onclick: function() {
							// Top most window object
							var win = editor.windowManager.getWindows()[0];

							// Insert the contents of the dialog.html textarea into the editor
							editor.insertContent(win.getContentWindow().document.getElementById('content').value);

							// Close the window
							win.close();
						}
					},

					{text: 'Close', onclick: 'close'}
				]
			});
		}
	});
});