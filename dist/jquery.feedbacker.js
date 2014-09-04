/*
 *  Feedbacker - v0.1.0
 *  A lean plugin that enables instant feedback on any page
 *  http://github.io/TheBrockEllis/Feedbacker.js
 *
 *  Made by Brock Ellis
 *  Under MIT License
 */
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
        width: 50,
        height: 50,
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
            $(questionMark).addClass("questionMark").css({
                "width": this.settings.width + "px",
                "height": this.settings.height + "px",
                "line-height": this.settings.height + "px",
                "bottom": "5px",
                "right": "5px"}).text("?");

            //append the question mark div to the element
            $(this.element).append(questionMark);

            /*
             * Modal
             */

            //create the div that will act and the feedback form
            var feedbackModal = document.createElement("div");

            var modalBottom = this.settings.height + 25;

            //add the necessary css class to the modal
            $(feedbackModal).addClass("feedbackModal").css({
               "bottom": modalBottom + "px",
               "right": "5px"
            });

            //check for options and create HTML for the form

            var form = document.createElement("form");
            form.id = "feedbackerForm";
            form.action = this.settings.action;
            form.method = "post";
            $(feedbackModal).append(form);

            if (this.settings.name === true) {
                var formName = document.createElement("input");
                formName.type = "text";
                formName.placeholder = "Name";
                formName.id = "name";
                formName.className = "formElement";
                $(form).append(formName);
            }

            if (this.settings.email === true) {
                var formEmail = document.createElement("input");
                formEmail.type = "text";
                formEmail.placeholder = "Email";
                formEmail.id = "email";
                formEmail.className = "formElement";
                $(form).append(formEmail);
            }

            if (this.settings.message === true) {
                var formMessage = document.createElement("textarea");
                formMessage.value = "Message";
                formMessage.id = "message";
                formMessage.className = "formElement formMessage";
                $(form).append(formMessage);
            }

            var formButton = document.createElement("input");
            formButton.type = "submit";
            formButton.value = "Submit";
            formButton.id = "feedbackerSubmit";
            formButton.className = "formElement formButton";
            $(form).append(formButton);

            //append the modal div to the element
            $(this.element).append(feedbackModal);

            //when settled, set up click listener
            $(questionMark).on("click", function(){
               $(feedbackModal).toggle();
               $(this).toggleClass("questionMarkActive");
            });

            //remove textareas content if focused on
            $("#message").on("click focus", function(){
                if( $(this).val() === "Message" ) { $(this).val(""); }
            });

            //set autocomplete to off for all form elements
            $("input, textarea").attr("autocomplete", "off");

            //when submit is clicked, send the form to the action
            //proxy allows the scope of 'this' to be correct to access settings
            $(form).submit( $.proxy(this.submitForm, this));

        },
        submitForm: function (event) {
            //stops the actual submittal of form so that Feedback
            //can handle it programmatically
            event.preventDefault();

            //this_ referrences the top level scope
            var this_ = this;
            var acknowledgement = this_.settings.acknowledgement;

            //if email is required, make sure it has a value
            if(this_.settings.requireEmail){
                if ( $("#email").val() === "" ) {
                    alert("Please enter your email address");
                    return;
                }
            }

            //if name is required, make sure it has a value
            if(this_.settings.requireName){
                if ( $("#name").val() === "" ) {
                    alert("Please enter your name");
                    return;
                }
            }

            //if a message is required, make sure it has a value
            if(this_.settings.requireMessage){
                if ( $("#message").val() === "Message" ) {
                    alert("Please enter a message");
                    return;
                }
            }

            $.ajax({
                url: this.settings.action,
                data: $("#feedbackerForm").serialize(),
                type: "post",
                contentType: "application/json"
            })
            .done(function(){
                //proxy used to pass the global this scope to the next function
                $.proxy(this_.showResult(acknowledgement), this);
            })
            .fail(function(){
                //proxy used to pass the global this scope to the next function
                $.proxy(this_.showResult("Uh oh. The feedbackzzzzzz was not submitted successfully. Try again later?"), this);
            })
            .always(function(){
                $("#feedbackerForm").find("input[type=text], textarea").val("");
                setTimeout(function(){
                    var modal = $(".feedbackModal");
                    modal.hide();
                    modal.find("form").show();
                    modal.find("h1").remove();
                    $(".questionMark").removeClass("questionMarkActive");
                }, 3000);
            });
        },
        showResult: function (message) {
            var modal = $(".feedbackModal");
            modal.find("form").css("display", "none");
            modal.append("<h1>"+message+"</h1>");
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
