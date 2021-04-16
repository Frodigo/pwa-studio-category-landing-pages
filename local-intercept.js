const { Targetables } = require('@magento/pwa-buildpack')

module.exports = targets => {

    const targetables = Targetables.using(targets);

    const CategoryRootComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/RootComponents/Category/category'
    );

    const ImprovedCategoryContent = CategoryRootComponent.addImport(
        "ImprovedCategoryContent from '@theme/category/components/ImprovedCategoryContent'"
    );

    CategoryRootComponent.replaceJSX('<CategoryContent />', `<${ImprovedCategoryContent} />`)
        .setJSXProps(`ImprovedCategoryContent`, {
            'categoryId': '{id}',
            'classes': '{classes}',
            'data': '{categoryData}',
            'pageControl': '{pageControl}',
            'sortProps': '{sortProps}',
            'pageSize': '{pageSize}',
        });
}
