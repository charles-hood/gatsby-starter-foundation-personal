/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine } from "react-icons/ri"
import {
  SiFacebook,
  SiTwitter,
  SiLinkedin,
  SiYoutube,
  SiInstagram,
  SiGithub,
  SiTelegram,
} from "react-icons/si"
import { FaWordpress } from "react-icons/fa"
import { SiTiktok } from "react-icons/si"

import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import Seo from "../components/seo"
import Icons from "../util/socialmedia.json"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tagline
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 585, height: 439)
          }
        }
        cta {
          ctaText
          ctaLink
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 6
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 345, height: 260)
              }
            }
          }
        }
      }
    }
  }
`

const HomePage = ({ data }) => {
  const { markdownRemark, posts } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  const sIcons = Icons.socialIcons.map((icons, index) => {
    return (
      <div key={"social icons" + index}>
        {icons.icon === "facebook" ? (
          <Link to={icons.url} target="_blank" aria-label="link to Facebook">
            <SiFacebook alt="Facebook icon"/>
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "twitter" ? (
          <Link to={icons.url} target="_blank" aria-label="link to Twitter">
            <SiTwitter alt="Twitter icon"/>
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "tiktok" ? (
          <a href={icons.url} target="_blank" aria-label="link to TikTok">
            <SiTiktok alt="TikTok icon"/>
          </a>
        ) : (
          ""
        )}
        {icons.icon === "linkedin" ? (
          <Link to={icons.url} target="_blank" aria-label="link to Linkedin">
            <SiLinkedin alt="Linkedin icon"/>
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "youtube" ? (
          <Link to={icons.url} target="_blank" aria-label="link to Youtube">
            <SiYoutube alt="Youtube icon" />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "instagram" ? (
          <Link to={icons.url} target="_blank" aria-label="link to Instagram">
            <SiInstagram alt="Instagram icon" />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "github" ? (
          <Link to={icons.url} target="_blank" aria-label="link to Github" >
            <SiGithub alt="Github icon" />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "telegram" ? (
          <Link to={icons.url} target="_blank" aria-label="link to Telegram" >
            <SiTelegram alt="Telegram icon" />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "wordpress" ? (
          <Link to={icons.url} target="_blank" aria-label="link to Wordpress">
            <FaWordpress alt="Wordpress icon" />
          </Link>
        ) : (
          ""
        )}
      </div>
    )
  })
  return (
    <Layout>
      <Seo />
      <div className="home-banner grids col-1 sm-2">
        <div>
          <h1 className="title">{frontmatter.title}</h1>
          <p
            className="tagline"
            sx={{
              color: "muted",
            }}
          >
            {frontmatter.tagline}
          </p>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <Link
            to={frontmatter.cta.ctaLink}
            className="button"
            sx={{
              variant: "variants.button",
            }}
          >
            {frontmatter.cta.ctaText}
            <span className="icon -right">
              <RiArrowRightSLine />
            </span>
          </Link>
          <div
            className="social-icons"
            sx={{
              variant: "variants.socialIcons",
            }}
          >
            {sIcons}
          </div>
        </div>
        <div>
          {Image ? (
            <GatsbyImage
              image={Image}
              alt={frontmatter.title + " - Featured image"}
              className="featured-image"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <BlogListHome data={posts} />
    </Layout>
  )
}

export default HomePage
