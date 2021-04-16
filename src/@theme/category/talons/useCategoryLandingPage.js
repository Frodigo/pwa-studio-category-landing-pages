import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CMS_BLOCKS } from '@magento/venia-ui/lib/components/CmsBlock/cmsBlock.js';

/**
 * Returns props necessary to render the CategoryLandingPage @component.
 *
 * @param {object} props
 * @param {number} props.staticBlockId - ID of a Static Block connected with the Category Landing Page
 *
 * @returns {string} result.errorMessage - error message returns if something went wrong
 * @returns {bool} result.isLoading - flag determinates is data loading
 * @returns {string} result.content - HTML content of Static Block connected to the Category Landing Page
 */
export const useCategoryLandingPage = props => {
    const {
        staticBlockId
    } = props;

    const [ content, setContent ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    const { data, error, loading } = useQuery(GET_CMS_BLOCKS, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !staticBlockId,
        variables: {
            identifiers: [ staticBlockId ]
        }
    });

    useEffect(() => {
        if (data && data.cmsBlocks && data.cmsBlocks.items) {
            setContent(data.cmsBlocks.items[0].content);
        }

        if (!staticBlockId || error || data && data.cmsBlocks && data.cmsBlocks.items.length === 0) {
            setErrorMessage('Unable to get category page content. Please try again later.')
        }

    }, [data, staticBlockId, error])

    return {
        errorMessage,
        isLoading: loading,
        content
    }
}
