import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { ProductContext } from '../context/ProductContext';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { selectedProduct } = useContext(ProductContext);
  const [displayNameMap, setDisplayNameMap] = useState({});
  const previousPath = useRef(location.pathname);

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  useEffect(() => {
    const newDisplayNameMap = {};

    pathnames.forEach((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;

      if (to === '/products') {
        newDisplayNameMap[to] = 'Products';
      } else if (to === '/search-results') {
        newDisplayNameMap[to] = 'Search Results';
      } else if (selectedProduct?.name && isLast && to.startsWith('/products')) {
        newDisplayNameMap[to] = selectedProduct.name;
      } else {
        newDisplayNameMap[to] = capitalize(value);
      }
    });

    setDisplayNameMap(newDisplayNameMap);
    previousPath.current = location.pathname;
  }, [pathnames, selectedProduct, location]);

  useEffect(() => {
    if (location.pathname.startsWith('/brands') && previousPath.current.startsWith('/products')) {
      setDisplayNameMap((prevMap) => {
        const updatedMap = { ...prevMap };
        // Remove any breadcrumb related to products
        Object.keys(updatedMap).forEach((key) => {
          if (key.startsWith('/products')) {
            delete updatedMap[key];
          }
        });
        return updatedMap;
      });
    }
    previousPath.current = location.pathname;
  }, [location]);

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

        const displayName = displayNameMap[to];

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
