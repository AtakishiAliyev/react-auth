const logout = () => {
    console.log('ok');
    localStorage.removeItem("user");
    window.location.href = "/login";
}

export { logout }