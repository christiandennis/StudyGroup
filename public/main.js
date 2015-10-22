var main = (function() {
	var groupApiUrl = 'https://sheetsu.com/apis/5964fc68';
	var studyGroups; // smiles container, value set in the "start" method below
    var studyGroupTemplateHtml; // a template for creating smiles. Read from index.html
                           // in the "start" method
    var create; // create form, value set in the "start" method below

     /**
    * HTTP GET request
    * @param  {string}   url       URL path, e.g. "/api/smiles"
    * @param  {function} onSuccess   callback method to execute upon request success (200 status)
    * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
    * @return {None}
    */
   var makeGetRequest = function(url, onSuccess, onFailure) {
       $.ajax({
           type: 'GET',
           url: url,
           dataType: "json",
           success: onSuccess,
           error: onFailure
       });
   };

   /**
     * HTTP POST request
     * @param  {string}   url       URL path, e.g. "/api/smiles"
     * @param  {Object}   data      JSON data to send in request body
     * @param  {function} onSuccess   callback method to execute upon request success (200 status)
     * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
     * @return {None}
     */
    var makePostRequest = function(url, data, onSuccess, onFailure) {
        $.ajax({
            type: 'POST',
            url: apiUrl,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };


    /**
     * Insert smile into smiles container in UI
     * @param  {Object}  smile       smile JSON
     * @param  {boolean} beginning   if true, insert smile at the beginning of the list of smiles
     * @return {None}
     */
    var insertStudyGroup = function(studyGroup, beginning) {
        // Start with the template, make a new DOM element using jQuery
        var newElem = $(studyGroupTemplateHtml);
        // Populate the data in the new element
        // Set the "id" attribute
        newElem.attr('id', studyGroup.groupID);
        // Now fill in the data that we retrieved from the server
        newElem.find('.title').text(studyGroup.title);
        newElem.find('.date').text(studyGroup.datetime.slice(0,10));
        newElem.find('.time').text(studyGroup.datetime.slice(11,16));
        newElem.find(".description").text(studyGroup.description);
        newElem.find(".location").text(studyGroup.location);
        newElem.find(".capacity").text(studyGroup.capacity);



        // FINISH ME (Task 2): fill-in the rest of the data
        if (beginning) {
            studyGroups.prepend(newElem);
        } else {
            studyGroups.append(newElem);
        }
    };

    /**
     * Get recent smiles from API and display 10 most recent smiles
     * @return {None}
     */
    var displayStudyGroups = function() {
        // Prepare the AJAX handlers for success and failure

        var onSuccess = function(data) {
            /* FINISH ME (Task 2): display smiles with most recent smiles at the beginning */
            for (var i = 0; i < data.result.length; i++ ) {
              insertStudyGroup(data.result[i],false)
            }
        };
        var onFailure = function(data) {
            console.error(data.errors);
        };
        /* FINISH ME (Task 2): make a GET request to get recent smiles */
        count = 10
        makeGetRequest(groupApiUrl,onSuccess,onFailure);
    };


    /**
     * Start the app by displaying the most recent smiles and attaching event handlers.
     * @return {None}
     */
    var start = function() {
        //studyGroups = $(".studyGroups");
        // Grab the first smile, to use as a template
        //studyGroupTemplateHtml = $(".studyGroups .studyGroup")[0].outerHTML;
        // console.log(smileTemplateHtml)
        // Delete everything from .smiles
        //studyGroups.html('');

        //displayStudyGroups();
    };


    // PUBLIC METHODS
    // any private methods returned in the hash are accessible via Smile.key_name, e.g. Smile.start()
    return {
        start: start
    };


})();