// Sorts an index in InDesign based on page numbers
function sortIndexByPage() {
    var doc = app.activeDocument;
    var indexStory = doc.stories[doc.stories.length - 1]; // Assuming index is in the last story
    var indexText = indexStory.contents;
    
    // Split the index into lines
    var lines = indexText.split(/\r|\n/);
    var indexEntries = [];

    // Extract terms and page numbers
    for (var i = 0; i < lines.length; i++) {
        var match = lines[i].match(/(.*?)[\.\s]+(\d+)$/); // Match text and page number
        if (match) {
            indexEntries.push({
                term: match[1].trim(),
                page: parseInt(match[2]), // Convert to number for sorting
                original: lines[i]
            });
        }
    }

    // Sort by page number
    indexEntries.sort(function(a, b) {
        return a.page - b.page;
    });

    // Reconstruct the sorted index
    var sortedText = indexEntries.map(entry => entry.original).join("\r");

    // Replace the old index with sorted index
    indexStory.contents = sortedText;

    alert("Index sorted by page numbers!");
}

// Run the function
sortIndexByPage();
