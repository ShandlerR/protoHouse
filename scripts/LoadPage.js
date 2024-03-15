const regex = new RegExp(/^\d*\(\d*\)$/);

// Creates a single Container Containing "Amount" of inputs. 
function createSkillBoxes(amount)
{
  // Create the Parent Container
  const container = document.createElement("div");
  document.body.appendChild(container);

  for(let i = 0; i < amount; i++)
  {
    // Create the input element
    const input = document.createElement("input");
    input.setAttribute("type", "text");


    // set default values
    input.dataset.level = "2";
    input.dataset.mod = "3";
    
    // assign information to frontend display
    input.setAttribute("value", (parseInt(input.dataset.level) + parseInt(input.dataset.mod)));
    container.appendChild(input);

    // Add all the event listeners

    // When the user Hovers, change the text
    input.addEventListener("mouseenter", function(e) { setStatus(e) })

    // When the User clicks, validate that the data never leaves form Level(Mod).
    input.addEventListener("focus", function(e) { setCheckInputForm(e) });

    // When the user clicks off: Stop Validating text, save Level and Mod, then return to form "Value" (A single Number representing Level + Mod).
    input.addEventListener("focusout", function(e) { removeCheckInputForm(e); saveStatus(e); returnStatus(e); });
    
    // When the mouse leaves, save only if the user is not trying to change data (Focus).
    input.addEventListener("mouseleave", function(e) { if(document.activeElement !== e.target) { saveStatus(e); returnStatus(e) } });
    
  }
}

/*
simply saves the level and mod. This assumes the display is in the form
level(mod) or _(_) where _ represents blank space. This function Understands that _ represents a 0. 
*/

 function saveStatus(event)
{
  const valuesArray = event.target.value.split("(");

  valuesArray[1] = valuesArray[1].replace("(", "");
  valuesArray[1] = valuesArray[1].replace(")", "");

  if (valuesArray[0] === "")
  {
    valuesArray[0] = "0";
  }

  if (valuesArray[1] === "")
  {
    valuesArray[1] = "0";
  }

  event.target.dataset.level = valuesArray[0];
  event.target.dataset.mod = valuesArray[1];
  
}

// simply displays the Level and Mod in form of level(mod)
function setStatus(event)
{
  let dataset = event.target.dataset;
  let level = parseInt(dataset.level);
  let mod = parseInt(dataset.mod);

  event.target.value = `${level}(${mod})`;
}

// Return the display to it's original Form of a single number. (Level = 5, mod = 3, then the display should say "8")
function returnStatus(event)
{
  event.target.value = (parseInt(event.target.dataset.level) + parseInt(event.target.dataset.mod));
}

// Adds an event listener that guarentees the display is always in the form of level(mod). (Or At least "_(_)" where _ is blank space)
function setCheckInputForm(event)
{
  event.target.addEventListener("input", checkInputForm)
}

// Checks to make sure the text in event never violates _(_) form. 
function checkInputForm(event)
{
  text = event.target.value;

  if(regex.test(text) != true)
  {
    //reset the text
    setStatus(event);
  }
  else 
  {
    // save the valid text so far
    saveStatus(event);
  }
}

// removes text validation code.
function removeCheckInputForm(event)
{
  event.target.removeEventListener("input", checkInputForm);
}

createSkillBoxes(10);