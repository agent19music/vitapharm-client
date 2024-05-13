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

export default function NavbarWithExtensions() {
  const NAV_ITEMS = [
    {
      label: 'BRANDS',
      children: [
        {
          label: 'Absolute Repair',
          href: '#',
        },
        {
          label: 'Baki',
          href: '#',
        },
        {
          label: 'Bio Balance',
          href: '#',
        },
        {
          label: 'Bio-Oil',
          href: '#',
        },
        {
          label: 'Cerave',
          href: '#',
        },
        {
          label: 'Curl Expression',
          href: '#',
        },
        {
          label: 'DANG!',
          href: '#',
        },
        {
          label: 'Garnier',
          href: '#',
        },
        {
          label: 'Goatee',
          href: '#',
        },
        {
          label: 'Korean Skincare Brands',
          href: '#',
        },
        {
          label: 'L\'Oréal Professionnel Paris',
          href: '#',
        },
        {
          label: 'La Roche Posay',
          href: '#',
        },
        {
          label: 'L’ORÉAL',
          href: '#',
        },
        {
          label: 'L’ORÉAL PARIS',
          href: '#',
        },
        {
          label: 'Mandevu',
          href: '#',
        },
        {
          label: 'Marini Naturals',
          href: '#',
        },
        {
          label: 'Mizani',
          href: '#',
        },
        {
          label: 'ORS',
          href: '#',
        },
        {
          label: 'Products for Him: BaKi Bros',
          href: '#',
        },
        {
          label: 'Qasil',
          href: '#',
        },
        {
          label: 'Routine Bundles',
          href: '#',
        },
        {
          label: 'Scalp Advanced',
          href: '#',
        },
        {
          label: 'Shea Moisture Hair',
          href: '#',
        },
        {
          label: 'Uncover',
          href: '#',
        },
      ],
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
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
