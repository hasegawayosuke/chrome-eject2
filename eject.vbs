'Delete ZoneId from this script file
Dim fso, ZoneIdFile
Set fso = CreateObject( "Scripting.FileSystemObject" )
Set ZoneIdFile = fso.CreateTextFile( WScript.ScriptFullName & ":Zone.Identifier", True, False )
ZoneIdFile.WriteLine( "[ZoneTransfer]" )
ZoneIdFile.WriteLine( "ZoneId=0" )
ZoneIdFile.Close

Dim wmp
Dim drives
Dim i
Set wmp = CreateObject( "WMPlayer.OCX" )
Set drives = wmp.cdromCollection
 
For i = 0 To drives.Count - 1
drives.Item( i ).Eject
Next
