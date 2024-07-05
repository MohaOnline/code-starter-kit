import React from "react";

/**
 * Usage:
 *
 * <Showcase url="" title="">
 *     ...
 * </Showcase>
 *
 * or
 *
 * {React.createElement(Showcase)} to render in JSX.
 */
class Showcase extends React.Component {
    render() {
        // TODO make sure this.props.url and this.props.title is not null.
        if (this.props.url === undefined) {
            return null;
        }
        if (this.props.title === undefined) {
            return null
        }

        const title = React.createElement('a', {href: this.props.url}, this.props.title);
        // Second argument of createElement equals HTML attributes.

        return React.createElement(React.Fragment, null,
            React.createElement('h2', null, title),
            // Output any contents between <Showcase></Showcase>
            this.props.children     // Appends rest of passed arguments through `this.props.children`.
        );
    }
}

export default Showcase;

