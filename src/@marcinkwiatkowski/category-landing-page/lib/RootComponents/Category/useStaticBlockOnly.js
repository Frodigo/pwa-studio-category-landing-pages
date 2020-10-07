import { useQuery } from '@apollo/react-hooks';
import GET_CMS_BLOCKS from '@magento/venia-ui/lib/queries/getCmsBlocks.graphql';

/**
 * Get static block content for category.
 *
 * @param {object} props
 * @returns {{staticBlockContent: string}}
 */
export const useStaticBlockOnly = props => {
    const {
        blockId
    } = props;

    // TODO: add error handling
    const { data } = useQuery(GET_CMS_BLOCKS, {
        variables: {
            identifiers: [blockId]
        }
    });

    const content = (data && data.cmsBlocks && data.cmsBlocks.items) ? data.cmsBlocks.items[0].content : ''

    return {
        content
    }
}
