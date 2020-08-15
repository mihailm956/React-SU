const getNavigation = (loggedIn, user) => {

    const authLinks = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "Issues",
            link: "/issues"
        },
        {
            title: "Profile",
            link: `/profile/${user && user.id}`
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
            title: "Issues",
            link: "/issues"
        },
        {
            title: "Sign In",
            link: "/sign-in"
        },
        {
            title: "Sign Up",
            link: "/sign-up"
        },
        {
            title: "Profile",
            link: `/profile/${user && user.id}`
        },
        {
            title: "SignOut",
            link: "/sign-out"
        }
    ]

    return loggedIn ? authLinks : guestLinks;
};

export default getNavigation;