# Hw25TrafficLight

## Requirements

1. Build an application to implement three lights: each lights has two colors. The are stay either in grey or the other color( e.g. red/grey, yellow/grey, and green/grey). First light stays 4 seconds as red and turn grey, then last one stays 4 seconds as green then turn grey, then the middle one stays 2 seconds as yellow and turns grey. The light changing is an infinite cycle. (see video attached). Reply your answer by this message.
2. You can either use html + css or html + js to do this assignment.

## Should I use `DOMContentLoaded` to ensure the DOM is loaded before running the script?

In many traditional JavaScript setups, especially if the `<script>` tag is placed in the `<head>` of the HTML without a `defer` attribute, you absolutely need to wrap your code in a `DOMContentLoaded` event listener.  

However, in your specific case, using modern JavaScript modules, you don't need to do that. Here's why:

1. Module Execution Timing: Scripts loaded with `type="module"` behave similarly to scripts with the `defer` attribute. They are downloaded asynchronously but are only executed after the HTML document has been fully parsed.
2. DOM Ready: By the time your module script (`main.ts`) starts running, the browser has already processed the HTML, and the elements like #red-light, #yellow-light, and #green-light are guaranteed to exist in the DOM.
