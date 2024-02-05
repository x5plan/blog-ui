import * as React from "react";

export interface IErrorPageLink {
    title: string;
    href: string | URL;
}

export interface IErrorPageProps {
    message: string;
    description?: string;
    /**
     * A list of links to display on the error page.
     * Users can click on these to navigate to other parts of the app.
     */
    links?: IErrorPageLink[];
    /**
     * Whether to show a back button to navigate to the previous page.
     * @default false
     */
    showBackButton?: boolean;
}

export const ErrorPage: React.FC<IErrorPageProps> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { message, description, links = [], showBackButton = false } = props;

    React.useEffect(() => {
        console.log(message);
    }, [message]);

    // TODO: Implement error page
    return (
        <div>
            <h1>{message}</h1>
            <p>{description}</p>
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <a href={link.href.toString()}>{link.title}</a>
                    </li>
                ))}
            </ul>
            {showBackButton && <button>Back</button>}
        </div>
    );
};
