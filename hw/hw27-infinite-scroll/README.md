# Hw27InfiniteScroll

## Requirements

You're given an API endpoint that returns a list of AlgoExpert testimonials (yes, our real testimonials!), and you have to fetch and display these testimonials on the page.
The API expects GET requests at this URL: <https://api.frontendexpert.io/api/fe/testimonials>

Since there might be a lot of testimonials, you'll have to use the API endpoint's pagination functionality to repeatedly fetch a limited number of testimonials at a time. Specifically, the API accepts the following two query parameters:
limit: (required) the maximum number of testimonials to request.
after: (optional): a string ID used as a cursor for pagination. For instance, if the last testimonial you fetched had an ID of "55”, adding after=55 to the URL would fetch testimonials starting after the testimonial with ID "55"
For example, this would be a valid URL to request:
<https://api.frontendexpert.io/api/fe/testimonials?limit=2&after=55>

The API responds with a JSON object containing two keys: a "hasNext" boolean, which will be false if the response includes the last testimonial in the database, and a "testimonials" array, which contains testimonial objects, each with a string "message" and a unique string "id”, to be used as the after query parameter.

For example, the URL above might respond with:
This response would indicate that there are more testimonials to be fetched after the testimonial with ID "55" , since "hasNext" is true.

Regarding exact functionality, you should fetch 5 testimonials and append them to the testimonial container as soon as the page loads. Then, whenever the user scrolls to the bottom of the testimonial container, you should fetch another 5 testimonials and append them.
Background color for each testimonial container: #00557f, top border: #11967e.

Note that:
Only one API call should be issued at a time; when one call is pending, no other calls should be issued, even if the user is scrolling down.
Once all testimonials have been fetched, you should no longer makes calls to the API.
You should listen to "scroll" events. The scrollHeight, scrollTop and clientHeight properties might be helpful to determine if you are scrolled to the bottom of the container.
After each request, make sure to save the last returned ID to use as the “after” parameter in future requests.
Expected output:

(This question comes from AlgoExpert, check the original question here: <https://www.algoexpert.io/frontend/coding-questions/infinite-scroll> )
