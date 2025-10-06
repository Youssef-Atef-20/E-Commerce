const Navbar = () => {
  return (
    <nav>
      <div>
        <a href="/">
          <h1>Exclusive</h1>
        </a>
      </div>

      <ul>
        <li>
          <a href="./HomePage">Home</a>
        </li>
        <li>
          <a href="./Contact">Contact</a>
        </li>
        <li>
          <a href="./About">About</a>
        </li>
        <li>
          <a href="./SignUp">Sign Up</a>
        </li>
      </ul>

      <div>
        <form>
          <input 
            type="text" 
            placeholder="What are you looking for?" 
          />
          <button type="submit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <a href="./wishlist">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <a href="./cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 2L7.17 6M9 2L10.83 6M9 2H15M15 2L16.83 6M15 2L13.17 6M7.17 6H16.83M7.17 6L5 10M16.83 6L19 10M5 10H19M5 10L3 22H21L19 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;