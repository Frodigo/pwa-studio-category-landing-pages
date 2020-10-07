import React, { Fragment, Suspense } from 'react';
import { array, shape, string } from 'prop-types';
import RichContent from '@magento/venia-ui/lib/components/RichContent';

import { useCategoryContent } from '@magento/peregrine/lib/talons/RootComponents/Category';
import { useStaticBlockOnly } from './useStaticBlockOnly';

import NoProductsFound from '@magento/venia-ui/lib/RootComponents/Category/NoProductsFound';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Title } from '@magento/venia-ui/lib/components/Head';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import Gallery from '@magento/venia-ui/lib/components/Gallery';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import RichText from '@magento/venia-ui/lib/components/RichText';
import defaultClasses from '@magento/venia-ui/lib/RootComponents/Category/category.css';

const FilterModal = React.lazy(() => import('@magento/venia-ui/lib/components/FilterModal'));
import GET_PRODUCT_FILTERS_BY_CATEGORY from '@magento/venia-ui/lib/queries/getProductFiltersByCategory.graphql';
import {STATIC_BLOCK_ONLY_DISPLAY_MODE} from "../../constants/category";

const CategoryContent = props => {
    const { categoryId, data, pageControl, sortProps } = props;
    const [currentSort] = sortProps;

    const talonProps = useCategoryContent({
        categoryId,
        data,
        queries: {
            getProductFiltersByCategory: GET_PRODUCT_FILTERS_BY_CATEGORY
        }
    });

    const {
        categoryName,
        categoryDescription,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items,
        pageTitle,
        totalPagesFromData
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const isStaticBlockMode = data.category.display_mode === STATIC_BLOCK_ONLY_DISPLAY_MODE;
    const header = !isStaticBlockMode && filters ? (
        <Fragment>
            <div className={classes.headerButtons}>
                <button
                    className={classes.filterButton}
                    onClick={handleOpenFilters}
                    onFocus={handleLoadFilters}
                    onMouseOver={handleLoadFilters}
                    type="button"
                >
                    {'Filter'}
                </button>
                <ProductSort sortProps={sortProps} />
            </div>
            <div className={classes.sortContainer}>
                {'Items sorted by '}
                <span className={classes.sortText}>{currentSort.sortText}</span>
            </div>
        </Fragment>
    ) : null;

    // If you want to defer the loading of the FilterModal until user interaction
    // (hover, focus, click), simply add the talon's `loadFilters` prop as
    // part of the conditional here.
    const modal = filters ? <FilterModal filters={filters} /> : null;

    const categoryDescriptionElement = categoryDescription ? (
        <RichContent html={categoryDescription} />
    ) : null;

    let content;

    if (isStaticBlockMode) {
        const staticBlockOnly = useStaticBlockOnly({
            blockId: data.category.landing_page
        });
        content = (
            <Fragment>
                <RichText content={staticBlockOnly.content} />
            </Fragment>
        )
    } else {
        content =
            totalPagesFromData === 0 ? (
                <NoProductsFound categoryId={categoryId} />
            ) : (
                <Fragment>
                    <section className={classes.gallery}>
                        <Gallery items={items} />
                    </section>
                    <div className={classes.pagination}>
                        <Pagination pageControl={pageControl} />
                    </div>
                </Fragment>
            );
    }


    return (
        <Fragment>
            <Breadcrumbs categoryId={categoryId} />
            <Title>{pageTitle}</Title>
            <article className={classes.root}>
                <h1 className={classes.title}>
                    <div className={classes.categoryTitle}>{categoryName}</div>
                </h1>
                {categoryDescriptionElement}
                {header}
                {content}
                <Suspense fallback={null}>{modal}</Suspense>
            </article>
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    classes: shape({
        filterContainer: string,
        gallery: string,
        headerButtons: string,
        pagination: string,
        root: string,
        title: string
    }),
    // sortProps contains the following structure:
    // [{sortDirection: string, sortAttribute: string, sortText: string},
    // React.Dispatch<React.SetStateAction<{sortDirection: string, sortAttribute: string, sortText: string}]
    sortProps: array
};
