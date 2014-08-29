// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "feedbacker";
    var defaults = {
        name: true,
        requireName: true,
        email: true,
        requireEmail: true,
        message: true,
        requireMessage: true,
        action: "http://www.yourdomain.com/feedbacker.php",
        acknowledgement: "Thank you for your feedback!"
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).

            /*
             * Question Mark
             */

            //create the div that will be the visible CTA
            var questionMark = document.createElement("div");

            //add the necessary css class and insert the ? icon
            $(questionMark).addClass("questionMark").text("?");

            //append the question mark div to the element
            $(this.element).append(questionMark);

            /*
             * Modal
             */

            //create the div that will act and the feedback form
            var feedbackModal = document.createElement("div");

            //add the necessary css class to the modal
            $(feedbackModal).addClass("feedbackModal");

            //check for options and create HTML for the form

            var form = document.createElement("form");
            form.name = "feedbackerForm";
            form.action = this.settings.action;
            form.method = "post";
            $(feedbackModal).append(form);

            if (this.settings.name === true) {
                var formElement = document.createElement("input");
                formElement.type = "text";
                formElement.placeholder = "Your Name";
                formElement.name = "name";
                formElement.className = "formElement";
                $(form).append(formElement);
            }

            if (this.settings.email === true) {
                var formElement = document.createElement("input");
                formElement.type = "text";
                formElement.placeholder = "Your Email";
                formElement.name = "email";
                formElement.className = "formElement";
                $(form).append(formElement);
            }

             if (this.settings.message === true) {
                var formElement = document.createElement("textarea");
                formElement.value = "Feedback = <3";
                formElement.name = "message";
                formElement.className = "formElement formMessage";
                $(form).append(formElement);
            }

            var formElement = document.createElement("input");
            formElement.type = "submit";
            formElement.value = "Submit";
            formElement.id = "feedbackerSubmit";
            formElement.className = "formElement formButton";
            $(form).append(formElement);

            //append the modal div to the element
            $(this.element).append(feedbackModal);

            //when settled, set up click listener
            $(questionMark).on("click", function(){
               $(feedbackModal).toggle();
               $(this).toggleClass("questionMarkActive");
            });

            //when submit is clicked, send the form to the action
            $(form).submit( $.proxy(this.submitForm, this));

        },
        submitForm: function (event) {
            console.log(this.settings);
            console.log("Event: " + event);
            event.preventDefault();
            $.post(this.settings.action, $(document.getElementsByName("feedbackerForm")).serialize())
            .done(function(data){
                alert(data);
            })
            .fail(function(data){
                alert(data);
            })
            .always(function(data){
                alert(data);
            });

        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        // chain jQuery functions
        return this;
    };

})( jQuery, window, document );
