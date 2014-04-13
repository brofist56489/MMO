function genCone(r, h, p) {
    var geom = new THREE.Geometry();

    var h2 = h / 2;
    var topVert = new THREE.Vector3(0, h2, 0);
    var bottomVert = new THREE.Vector3(0, -h2, 0);

    var presicion = p || 100;
    var step = 2 * Math.PI / presicion;
    var circVerts = [];
    for(var i=0, j=2*Math.PI; i < j; i += step) {
        circVerts.push(new THREE.Vector3(Math.cos(i) * r, -h2, Math.sin(i) * r));
    }

    geom.vertices.push(topVert);
    geom.vertices.push(bottomVert);

    for(var i=0, j=presicion; i < j; i++) {
        geom.vertices.push(circVerts[i]);
    }

    for(var i=2, j=presicion+1; i <= j; i++) {
        var k = (i === presicion+1) ? 2 : i+1;
        geom.faces.push(new THREE.Face3(i, 0, k));
        geom.faces.push(new THREE.Face3(k, 1, i));
    }

    geom.computeFaceNormals();

    return geom;
}

function genUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16|0, v=c=='x'?r:(r&0x3|0x8);
        return v.toString(16);
    });
}