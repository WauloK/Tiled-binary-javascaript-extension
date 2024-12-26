// Extension for exporting Tiled Map Editor tilemaps by Jason Oakley v 1.0
// Only actual tile numbers saved. No header.
// The map is saved in a raw binary format.
// Save in:
//		Windows : C:/Users/<USER>/AppData/Local/Tiled/extensions/
//		mac OSX	: ~/Library/Preferences/Tiled/extensions/
//		Linux 	: ~/.config/tiled/extensions/

var binaryMapFormat = {
    name: "Plain tiles binary",
    extension: "bin",

    write: function(map, fileName) {
		// Create file and write width and height
        var file = new BinaryFile(fileName, BinaryFile.WriteOnly);
		var buffer = new ArrayBuffer(1);
		var words = new Uint8Array(buffer);

		// Write each tile layer in map
        for (var i = 0; i < map.layerCount; ++i) {
            var layer = map.layerAt(i);
            if (layer.isTileLayer) {
				
                // Write each row in current layer
				for (y = 0; y < layer.height; ++y) {
                    
					// Write each column in current layer
					for (x = 0; x < layer.width; ++x) {
						var cell = layer.cellAt(x, y);
						// Build and write 8 bit byte
						var word = cell.tileId;
						words[0] = word;
						file.write(buffer);
                    }
                }
            }
        }
        file.commit();
    },
}

tiled.registerMapFormat("Plain tiles binary", binaryMapFormat)