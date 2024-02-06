# CDK-examples-public

This repository contains examples of connectors built using Tray.io's [CDK](https://developer.tray.io/developer-portal/cdk/introduction/).

1. tmdb: This connector is demonstrated in the [Quickstart tutorial](https://developer.tray.io/developer-portal/cdk/quickstart/) and its' follow up tutorial on Dynamic dropdown lists.

2. composite-example: this connector includes 3 operations, each with varying levels of complexity: ([Documentation for Composite Implementation](https://developer.tray.io/developer-portal/cdk/dsl-reference/#composite-implementation))
   - `list_posts` is a composite operation that demonstrates a basic use case. It retrieves a list of posts and formats the API response so it returns an array of objects.
   - `lists_posts_and_strip_ids` is a composite operation that demonstrates a more complex use case. It leverages the `list_posts` operation via the `composite` `invoke` method and strips the `userId` and `id` fields from the response.
   - `create_or_update_post` is a complex composite operation that demonstrates a use case that conditionally makes a POST or PUT request based on the existence of a post with a given ID. If the post `id` exists as an input property, the operation makes a PUT request to update the post. If the post `id` does not exist as an input property, the operation makes a POST request to create a new post.
