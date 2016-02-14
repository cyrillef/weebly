{{! template for the Autodesk Viewer.}}

<link href="https://developer.api.autodesk.com/viewingservice/v1/viewers/style.css" rel="stylesheet" />
<script src="https://developer.api.autodesk.com/viewingservice/v1/viewers/viewer3D.js"></script>

<div id="viewer3d" urn="{{urn}}" endpoint="{{endpoint}}" accesstoken="{{accesstoken}}" style="height: {{height}};"></div>
