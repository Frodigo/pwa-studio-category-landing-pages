import React from 'react';
import PropTypes from 'prop-types';

import CategoryContent from '@magento/venia-ui/lib/RootComponents/Category/categoryContent';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator/indicator'

import { useImprovedCategoryContent } from '../../talons/useImprovedCategoryContent';
import CategoryLandingPage from '../CategoryLandingPage';

/**
 * The ImprovedCategoryContent wraps CategoryContent @components and allows to display Category Landing Pages
 * @param {object} props
 * @param {number} props.categoryId - Category's ID
 * @param {object} props.classes - additional CSS classes that will be applied to the component
 * @param {object} props.data - Category data
 * @param {object} props.pageControl - Pagination data
 * @param {number} props.pageSize - Page size
 * @param {object} props.sortProps - Sort props
 */
const ImprovedCategoryContent = (props) => {
    const {
        categoryId,
        classes,
        data,
        pageControl,
        sortProps,
        pageSize,
        ...rest
    } = props;

    const {
        isLandingPage,
        isLoading,
        staticBlockId
    } = useImprovedCategoryContent({categoryId});

    const categoryContent = isLandingPage ? <div>
        <CategoryLandingPage staticBlockId={staticBlockId}/>
    </div> : <CategoryContent
        categoryId={categoryId}
        classes={classes}
        data={data}
        pageControl={pageControl}
        sortProps={sortProps}
        pageSize={pageSize}
    />;

    const shouldDisplayContent = !isLoading ? categoryContent : <LoadingIndicator/>;

    return (
        <div {...rest}>
            {shouldDisplayContent}
        </div>
    );
};

ImprovedCategoryContent.propTypes = {
    categoryId: PropTypes.number.isRequired,
    classes: PropTypes.object,
    data: PropTypes.object,
    pageControl: PropTypes.object,
    pageSize: PropTypes.number,
    sortProps: PropTypes.array
};

export default ImprovedCategoryContent;
