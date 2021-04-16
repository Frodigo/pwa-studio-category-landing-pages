import gql from 'graphql-tag'

export const GET_CATEGORY_LANDING_PAGE = gql`
    query category(
        $id: Int!
    ) {
        category(id: $id) {
            id
            display_mode
            landing_page
        }
    }
`;
