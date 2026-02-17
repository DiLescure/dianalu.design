import { gql } from '@urql/core';
import type { QueryDefinition } from '@/services/api/types';

// Get a single case study by slug
export const CaseStudyBySlug: QueryDefinition = {
  query: gql`
    query GetCaseStudyBySlug($slug: String!) {
      CaseStudies(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          id
          title
          slug
          heroTag
          subtitle
          heroStatement
          heroImage {
            url
            alt
          }
          meta {
            label
            value
          }
          sections {
            __typename
            ... on TextSection {
              textBlockType: blockType
              textHeading: heading
              textTheme: theme
              textContent: content
            }
            ... on TableSection {
              tableBlockType: blockType
              tableHeading: heading
              tableTheme: theme
              tableHeadings {
                heading
              }
              rows {
                col1
                col2
              }
            }
            ... on Blockquote {
              quoteBlockType: blockType
              quote
              attribution
            }
            ... on Image {
              imageBlockType: blockType
              image {
                url
                alt
              }
              caption
              fullWidth
            }
            ... on ImageGrid {
              gridBlockType: blockType
              images {
                image {
                  url
                  alt
                }
                caption
              }
            }
            ... on ColorSwatches {
              swatchBlockType: blockType
              colors {
                hex
                label
              }
            }
            ... on OutcomeGrid {
              outcomeBlockType: blockType
              outcomeHeading: heading
              items {
                text
              }
            }
            ... on Placeholder {
              placeholderBlockType: blockType
              label
              description
            }
          }
          footerTagline
          footerSubtitle
          credits {
            role
            name
          }
        }
      }
    }
  `,
  defaultVariables: {},
};

// List all case studies (for index page)
export const CaseStudyList: QueryDefinition = {
  query: gql`
    query GetCaseStudies {
      CaseStudies(limit: 100) {
        docs {
          id
          title
          slug
          subtitle
          heroImage {
            url
            alt
          }
        }
      }
    }
  `,
  defaultVariables: {},
};
