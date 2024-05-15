import React from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Brands from './Brands';
import brandsWithLetters from './BrandsWithLetters';
// import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function NavbarWithExtensions() {
  const NAV_ITEMS = [
    {
      label: 'BRANDS',
      children: brandsWithLetters.slice(0, 5).map(brand => ({
        label: brand.name,
        href: '#',
      })),
      moreLink: '/brands',
    },
    {
      label: 'CATEGORY',
      children: [
        {
          label: 'Face',
          href: '#',
        },
        {
          label: 'Body',
          href: '#',
        },
        {
          label: 'Hands',
          href: '#',
        },
      ],
    },
    {
      label: 'SKIN TYPE',
      children: [
        {
          label: 'Oily',
          href: '#',
        },
        {
          label: 'Dry',
          href: '#',
        },
        {
          label: 'Combination',
          href: '#',
        },
      ],
    },
    {
      label: 'BEST SELLERS',
      children: [
        {
          label: 'Cera Ve',
          href: '#',
        },
        {
          label: 'Ganier',
          href: '#',
        },
        {
          label: 'Fenty',
          href: '#',
        },
      ],
    },
    {
      label: 'OFFERS',
      children: [
        {
          label: 'Discounts',
          href: '#',
        },
        {
          label: 'Promotions',
          href: '#',
        },
        {
          label: 'Limited Time Offers',
          href: '#',
        },
      ],
    },
  ];
  

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav navItems={NAV_ITEMS} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

const DesktopNav = ({ navItems }) => {
  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={'#'}
                fontSize={'sm'}
                fontWeight={500}
                color={useColorModeValue('gray.600', 'gray.200')}
                _hover={{
                  textDecoration: 'none',
                  color: useColorModeValue('gray.800', 'white'),
                }}>
                {navItem.label}
                <ChevronDownIcon />
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={useColorModeValue('white', 'gray.800')}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <Link key={child.label} href={child.href} role={'group'} display={'block'} p={2} rounded={'md'} _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                      <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
                        {child.label}
                      </Text>
                    </Link>
                  ))}
                  {navItem.moreLink && (
                    <Link key="more" href={navItem.moreLink} role={'group'} display={'block'} p={2} rounded={'md'} _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                      <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
                        More Brands
                      </Text>
                    </Link>
                  )}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export { Brands };
