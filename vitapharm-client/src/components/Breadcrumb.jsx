import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { selectedProduct } = useContext(ProductContext);

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  return (
    <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
      {pathnames.length > 0 && (
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to="/"
            className="ml-8 font-futurabold hover:text-brown-custom hover:no-underline"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        let displayName = capitalize(value);
        if (to === '/products') {
          displayName = 'Products'; 
        } else if (to === '/search-results') { // Handle search results route
          displayName = 'Search Results'; 
        } else if (selectedProduct?.name && isLast) {
          displayName = selectedProduct.name; 
        }

        return (
          <BreadcrumbItem className="font-futurabold" key={to} isCurrentPage={isLast}>
            <BreadcrumbLink
              as={Link}
              to={to}
              className="hover:text-brown-custom hover:no-underline"
            >
              {displayName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
