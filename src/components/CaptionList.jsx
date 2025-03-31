import { useState } from 'react';
import { 
  VStack, Box, Text, Button, useToast, 
  Divider, HStack, Spinner, Flex, Heading,
  Badge, useColorModeValue, Center
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import { FaCopy, FaRegCopy } from 'react-icons/fa';

export default function CaptionList({ captions, loading, onRegenerate }) {
  const toast = useToast();
  const [copied, setCopied] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(index);
        toast({
          title: "Caption copied!",
          description: "The caption has been copied to your clipboard.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "There was an error copying to your clipboard.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  if (loading) {
    return (
      <Center py={20}>
        <VStack spacing={6}>
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Heading size="lg" color="gray.700">Generating Captions...</Heading>
          <Text color="gray.600" textAlign="center" maxW="md">
            Our AI is crafting the perfect captions for your product. This may take a few seconds.
          </Text>
        </VStack>
      </Center>
    );
  }

  if (!captions || captions.length === 0) {
    return (
      <Box 
        p={8} 
        bg={bgColor} 
        borderRadius="lg" 
        border="1px" 
        borderColor={borderColor}
        textAlign="center"
      >
        <Heading size="lg" mb={4} color="gray.700">No Captions Yet</Heading>
        <Text color="gray.600" mb={6}>
          Fill out the form above to generate engaging captions for your product.
        </Text>
        <Text fontSize="sm" color="gray.500">
          Get 3 free generations to try it out!
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="lg" color="gray.700">Generated Captions</Heading>
        <Badge colorScheme="brand" fontSize="sm" px={3} py={1}>
          {captions.length} {captions.length === 1 ? 'caption' : 'captions'}
        </Badge>
      </Box>
      
      {captions.map((caption, index) => (
        <Box
          key={index}
          p={6}
          bg={bgColor}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
          position="relative"
          transition="all 0.2s"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'md',
            borderColor: 'brand.300',
          }}
        >
          <Text fontSize="lg" color="gray.700" mb={4}>
            {caption}
          </Text>
          <Button
            size="sm"
            variant="ghost"
            colorScheme="brand"
            position="absolute"
            top={4}
            right={4}
            onClick={() => handleCopy(caption, index)}
            leftIcon={copied === index ? <FaCopy /> : <FaRegCopy />}
          >
            {copied === index ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
      ))}
      
      <Button
        colorScheme="brand"
        size="lg"
        onClick={onRegenerate}
        mt={4}
        py={6}
        fontSize="lg"
      >
        Generate More Variations
      </Button>
    </VStack>
  );
} 