/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 *
 * we normalize the styles on initial load.
 */

(function () {
    var Viewer3d =PlatformElement.extend ({
        //_viewer

        initialize: function () {
            // we normalize the styles after placeholders are replaced.
            this.fixStyles () ;
            this.requestAcccesToken () ;
        },

        // normalizes the styles of all element children.
        fixStyles: function () {
            //this.$('.element').each (function (index) {
            //    $(this).attr ('style', '') ;
            //}) ;
        },

        requestAcccesToken: function () {
            var accessToken =$('#viewer3d').attr ('accesstoken') ;
            if ( accessToken !== '' ) {
                this.initializeViewer(accessToken);
            } else {
                //var ep =this.$el.attr ('endpoint') ;
                var ep =$('#viewer3d').attr ('endpoint') ;

                var xhr =new XMLHttpRequest () ;
                xhr.open ('GET', ep, false) ;
                xhr.send (null) ;
                var response =JSON.parse (xhr.responseText) ;
                this.initializeViewer (response.access_token) ;
            }
        },

        initializeViewer: function (accessToken) {
            var self =this ;

            //var urn =this.$el.attr ('urn') ;
            var urn =$('#viewer3d').attr ('urn') ;
            var options ={ 'document': urn, 'accessToken': accessToken, 'env': 'AutodeskProduction' } ;

            //this._viewer =new Autodesk.Viewing.Viewer3D ($("#viewer3d") [0], {}) ; // No toolbar
            this._viewer =new Autodesk.Viewing.Private.GuiViewer3D ($('#viewer3d') [0], {}) ; // With toolbar
            Autodesk.Viewing.Initializer (options, function () {
                self._viewer.initialize () ;

                if ( options.document.substring (0, 4) === 'urn:' )
                    options.document =options.document.substring (4) ;

                Autodesk.Viewing.Document.load ('urn:' + options.document, //options.accessToken,
                    function (doc) { // onLoadCallback
                        self._document =doc ;
                        // Get all the 3D and 2D views (but keep in separate arrays so we can differentiate in the UI)
                        self._views3D =Autodesk.Viewing.Document.getSubItemsWithProperties (doc.getRootItem (), { 'type': 'geometry', 'role': '3d' }, true) ;
                        self._views2D =Autodesk.Viewing.Document.getSubItemsWithProperties (doc.getRootItem (), { 'type': 'geometry', 'role': '2d' }, true) ;

                        // Load up first a 3D view by default
                        if ( self._views3D.length > 0 )
                            self._viewer.load (doc.getViewablePath (self._views3D [0])) ;
                        else if ( self._views2D.length > 0 )
                            self._viewer.load (doc.getViewablePath (self._views2D [0])) ;
                        else
                            return (alert ('ERROR: No 3D or 2D views found in this document!')) ;

                        self._viewer.addEventListener (Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function (event) {
                            //self._viewer.removeEventListener (Autodesk.Viewing.GEOMETRY_LOADED_EVENT, arguments.callee) ;
                            self._viewer.fitToView (true) ;
                            setTimeout (function () { self._viewer.autocam.setHomeViewFrom (self._viewer.navigation.getCamera ()) ; }, 1000) ;
                        }) ;
                    },
                    function (errorCode, errorMsg, messages) { // onErrorCallback
                        alert ('Loading Error #' + errorCode + ': ' + errorMsg + ' (' + messages [0 ].message + ')') ;
                    }
                ) ;
            }) ;
        }

    }) ;

    return (Viewer3d) ;
}) () ;
