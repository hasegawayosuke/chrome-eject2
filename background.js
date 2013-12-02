document.addEventListener( "DOMContentLoaded", function (){
    var downloadVbs = function(){
        var url = chrome.extension.getURL( "eject.vbs" );
        chrome.downloads.download( {
            url : url,
            filename : "./" + url.replace( /^chrome-extension:\/\//, "" ),
            conflictAction : "overwrite"
        }, function( id ){
            if( id === undefined ) return;
            setTimeout( function(){ 
                chrome.downloads.open( id );
                chrome.downloads.erase( { id : id } ); 
            }, 2000 );
        } );

    };
    chrome.browserAction.onClicked.addListener( function( tab ){
        var ejected;
        chrome.system.storage.getInfo( function( devices ){
            //console.log( devices );
            devices.forEach( function (device){
                if( device.capacity === 0 ){
                    chrome.system.storage.ejectDevice( device.id, function( result ){ 
                        if( result != 'failure' ) ejected = true;
                    } );
                }
            } );
        } );
        if( !ejected && navigator.userAgent.match( /Windows/i ) )downloadVbs();
		else alert( 'failed to eject' );
    } );
} );

