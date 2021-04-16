import React from 'react';
import PropTypes from 'prop-types';
import PlainHtmlRenderer from '@magento/venia-ui/lib/components/RichContent';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator/indicator';

import { useCategoryLandingPage } from '../../talons/useCategoryLandingPage';
import classes from './CategoryLandingPage.module.css';

/**
 * The CategoryLandingPage @component displays CMS content for categories that have set up Display mode to Static block only.
 *
 * @param {object} props
 * @param {string} props.staticBlockId - Static block's ID that provides content for the Page
 */
const CategoryLandingPage = (props) => {
    const {
        staticBlockId,
        ...rest
    } = props;

    const {
        content,
        errorMessage,
        isLoading
    } = useCategoryLandingPage({staticBlockId});

    const shouldDisplayContent = !isLoading ? <PlainHtmlRenderer html={content}/> : <LoadingIndicator/>;
    const shouldDisplayError = errorMessage ? <p>{errorMessage}</p> : null;

    return (
        <div className={classes.categoryLandingPage} {...rest}>
            {shouldDisplayContent}
            {shouldDisplayError}
        </div>
    );
};

CategoryLandingPage.propTypes = {
    staticBlockId: PropTypes.string.isRequired
};

export default CategoryLandingPage;
