import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  return (
    <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
      {pathnames.length > 0 && (
        <BreadcrumbItem>
          <BreadcrumbLink className='ml-8' as={Link} to="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <BreadcrumbItem key={to} isCurrentPage={isLast}>
            <BreadcrumbLink as={Link} to={to}>{capitalize(value)}</BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
