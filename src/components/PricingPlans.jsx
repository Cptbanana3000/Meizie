import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}
      bg="white"
      transition="transform 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        shadow: 'lg',
      }}
    >
      {children}
    </Box>
  );
}

export default function PricingPlans() {
  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h2" fontSize="3xl" color="brand.500">
          Plans That Fit Your Needs
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Choose the plan that suits your business requirements
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Starter
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                5
              </Text>
              <Text fontSize="xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}
            px={6}
            spacing={4}
            minH="300px"
          >
            <Box w="100%" pt={4}>
              <Button w="full" colorScheme="brand" variant="solid">
                Get Started
              </Button>
            </Box>
            <List spacing={3} textAlign="start" px={4}>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                50 captions per month
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Basic customization options
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                24-hour support response time
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Caption history (7 days)
              </ListItem>
            </List>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Badge
              position="absolute"
              top="-8px"
              right="-8px"
              colorScheme="green"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="sm"
              fontWeight="bold"
            >
              POPULAR
            </Badge>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Growth
              </Text>
              <Flex direction="column" align="center">
                <HStack justifyContent="center">
                  <Text fontSize="xl" color="gray.500" as="s">
                    $25
                  </Text>
                  <Badge colorScheme="red" fontSize="sm" ml={1}>
                    SAVE 40%
                  </Badge>
                </HStack>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    15
                  </Text>
                  <Text fontSize="xl" color="gray.500">
                    /month
                  </Text>
                </HStack>
              </Flex>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}
              px={6}
              spacing={4}
              minH="300px"
            >
              <Box w="100%" pt={4}>
                <Button w="full" colorScheme="brand" variant="solid">
                  Get Started
                </Button>
              </Box>
              <List spacing={3} textAlign="start" px={4}>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  <b>200 captions</b> per month
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  <b>Advanced</b> tone & style options
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  <b>Same-day</b> support response
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  Caption history (30 days)
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  Caption organization features
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  Custom keyword optimization
                </ListItem>
              </List>
            </VStack>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Badge
              position="absolute"
              top="-8px"
              right="-8px"
              colorScheme="accent"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="sm"
              fontWeight="bold"
            >
              BEST VALUE
            </Badge>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Lifetime
              </Text>
              <Flex direction="column" align="center">
                <HStack justifyContent="center">
                  <Text fontSize="xl" color="gray.500" as="s">
                    $249
                  </Text>
                  <Badge colorScheme="red" fontSize="sm" ml={1}>
                    SAVE 60%
                  </Badge>
                </HStack>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    99
                  </Text>
                  <Text fontSize="xl" color="gray.500">
                    one-time
                  </Text>
                </HStack>
              </Flex>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}
              px={6}
              spacing={4}
              minH="300px"
            >
              <Box w="100%" pt={4}>
                <Button w="full" colorScheme="accent" variant="solid">
                  Get Lifetime Access
                </Button>
              </Box>
              <List spacing={3} textAlign="start" px={4}>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  <b>Unlimited</b> captions forever
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  All premium features
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  Priority support (4hr response)
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  Unlimited caption history
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  <b>API access</b> for automation
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  <b>White-label</b> option available
                </ListItem>
              </List>
            </VStack>
          </Box>
        </PriceWrapper>
      </Stack>
    </Box>
  );
} 