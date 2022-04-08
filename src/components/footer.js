/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const Footer = () => (
  <footer
    className="site-footer"
    sx={{
      bg: "siteColor",
    }}
  >
    <div className="container">
      <p>
        Copyright &copy; 2022 by <Link to="https://www.facebook.com/RockOfPagesDotCom/">RockOfPages.com</Link>
      </p>
    </div>
  </footer>
)

export default Footer
