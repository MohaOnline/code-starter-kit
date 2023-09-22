(function (blocks, editor, element) {
    let createElement = element.createElement,
        // BlockControls = wp.blockEditor.BlockControls,
        SelectControl = wp.components.SelectControl,
        Placeholder = wp.components.Placeholder,
        el = wp.element.createElement,
        Fragment = wp.element.Fragment;
    if (ts_vgallery_gutenberg_script_data.vgallerys_count >= 1) {
        var ts_vgallery_list = ts_vgallery_gutenberg_script_data.ts_vgallery_list
        blocks.registerBlockType('tsvideogallery/gallery-block', {
            title: 'TS Gallery',
            icon: 'format-video',
            category: 'widgets',
            description: 'Gallery is a user-friendly plugin to display user or hashtag-based gallery feeds as a responsive customizable gallery.',
            keywords: ['gallery', 'video gallery', 'video', 'mp4', 'youTube', 'vimeo', 'wistia'],
            example: {
                attributes: {
                    'preview': true,
                },
            },
            edit: props => {
                if (props.attributes.tsv_id) {
                    return [
                        // createElement(
                        // BlockControls, {
                        // key: 'ts-vgallery-control'
                        // }
                        createElement(
                            SelectControl, {
                            className: 'ts_vgallery_select_block',
                            value: props.attributes.tsv_id,
                            options: ts_vgallery_list,
                            onChange: function (newValue) {
                                if (parseInt(newValue) > 0) {
                                    props.setAttributes({ tsv_id: newValue });
                                    createElement(wp.serverSideRender, {
                                        key: 'ts-vgallery-control',
                                        block: 'tsvideogallery/gallery-block',
                                        className: 'tsvgallery_guttenberg_block',
                                        attributes: props.attributes,
                                    });
                                } else {
                                    props.setAttributes({ tsv_id: '' });
                                }
                            }
                        }
                        ),
                        // ),
                        createElement(wp.serverSideRender, {
                            key: 'ts-vgallery-control',
                            block: 'tsvideogallery/gallery-block',
                            className: 'tsvgallery_guttenberg_block',
                            attributes: props.attributes,
                        })
                    ]
                } else if (props.attributes.preview) {
                    return [
                        createElement(
                            Fragment, {
                            key: "ts-vgallery-preview-control",
                            className: "ts-vgallery-preview-control",
                        },
                            el(
                                'img', {
                                src: ts_vgallery_gutenberg_script_data.ts_vgallery_preview,
                                style: {
                                    width: '100%',
                                    height: '100%'
                                }
                            },
                            ),
                        ),
                    ]
                } else {
                    return [
                        createElement(
                            Placeholder, {
                            key: "tsvgallery_selector_block",
                            className: "tsvgallery_selector_block",
                        },
                            el(
                                'img', {
                                width: 100,
                                height: 100,
                                src: ts_vgallery_gutenberg_script_data.ts_vgallery_logo
                            },
                            ),
                            el(
                                'h3', {
                                key: "ts_vgallery_h3",
                                className: "ts_vgallery_h3",
                            },
                                'TS VGallery'
                            ),
                            createElement(
                                SelectControl, {
                                className: 'ts_vgallery_select_block',
                                value: props.attributes.tsv_id,
                                options: ts_vgallery_list,
                                onChange: function (newValue) {
                                    if (parseInt(newValue) > 0) {
                                        props.setAttributes({ tsv_id: newValue });
                                        createElement(wp.serverSideRender, {
                                            key: 'ts-vgallery-control',
                                            block: 'tsvideogallery/gallery-block',
                                            className: 'tsvgallery_guttenberg_block',
                                            attributes: props.attributes,
                                        })
                                    } else {
                                        props.setAttributes({ tsv_id: '' });
                                    }
                                }
                            }
                            ),
                        ),
                    ]
                }
            },
            save: props => {
                return null;
            },
        })
    } else {
        return null;
    }

}(
    window.wp.blocks,
    window.wp.editor,
    window.wp.element
))