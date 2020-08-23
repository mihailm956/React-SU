const getNavigation = (loggedIn, userId) => {

    const authLinks = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "Admin",
            link: "/admin"
        },
        {
            title: "Issues",
            link: "/issues"
        },
        {
            title: "Profile",
            link: `/profile/${userId}`
        },
        {
            title: "SignOut",
            link: "/sign-out"
        }
    ]

    const guestLinks = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "Sign In",
            link: "/sign-in"
        },
        {
            title: "Sign Up",
            link: "/sign-up"
        },
    ]

    return loggedIn ? authLinks : guestLinks;
};

export default getNavigation;