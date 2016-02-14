/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 *
 * we normalize the styles on initial load.
 */

(function () {
    var Viewer3d =PlatformElement.extend ({
        //oViewer

        initialize: function () {
            // we normalize the styles after placeholders are replaced.
            this.normalizeAfterPlaceholders () ;
            this.initializeViewer () ;
        },

        normalizeAfterPlaceholders: function () {
            this.placeholderInterval =setInterval (function () {
                if ( this.$('.platform-element-child-placeholder').length == 0 ) {
                    // first off, stop listening
                    clearInterval (this.placeholderInterval) ;
                    this.fixStyles () ;
                }
            }.bind (this), 100) ;
        },

        // normalizes the styles of all element children.
        fixStyles: function () {
            //this.$('li.wsite-text').each (function (index, value) {
            //    var $value =$(value) ;
            //    var defaultText =$value.data ('default-text') ;
            //    var $el =$(value).find ('.editable-text') ;
            //    if ( $el.text () === defaultText )
            //        $el.attr ('style', '') ;
            //}) ;
            //
            //this.$('.element').each (function (index) {
            //    $(this).attr ('style', '') ;
            //}) ;
        },

        initializeViewer: function () {

        }

    }) ;

    return (Viewer3d) ;
}) () ;