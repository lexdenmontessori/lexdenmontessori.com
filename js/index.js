function initialize() {
    var mapstraction = new mxn.Mapstraction("map_canvas", "openlayers");
    var myPoint = new mxn.LatLonPoint(51.886719,0.887941);
    mapstraction.setCenterAndZoom(myPoint,10);

    /*mapstraction.addControls({
	pan: true, 
	zoom: 'small',
	map_type: true 
    });*/

    my_marker = new mxn.Marker(myPoint);
    mapstraction.addMarker(new mxn.Marker(myPoint));
    my_marker.setLabel("Lexden Montessori");
    my_marker.setInfoBubble("Exquisite!");
    mapstraction.addMarker(my_marker);
}
$(document).ready(function() {
    initialize();
});