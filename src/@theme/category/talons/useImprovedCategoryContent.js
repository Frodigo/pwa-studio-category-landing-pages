import { useQuery } from '@apollo/client';
import { GET_CATEGORY_LANDING_PAGE } from '../queries.gql';

/**
 * Returns props necessary to render the ImprovedCategoryContent @component.
 *
 * @param {object} props
 * @param {number} props.categoryID
 *
 * @returns {string} result.error - error message returns if something went wrong
 * @returns {bool} result.isLandingPage - flag determinates is a Category is in Statick Blocks only mode.
 *                                        This is true when display mode eauals 'PAGE'
 * @returns {bool} result.isLoading - flag determinates is data loading
 * @returns {number|null} result.staticBlockId - Static block ID set up for the Category Page or null.
 */
export const useImprovedCategoryContent = props => {
    const {
        categoryId
    } = props;

    const { data, loading } = useQuery(GET_CATEGORY_LANDING_PAGE, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            id: categoryId
        }
    });

    return {
        isLandingPage: data && data.category.display_mode === 'PAGE',
        isLoading: loading,
        staticBlockId: data ? data.category.landing_page : null,
    }
}
