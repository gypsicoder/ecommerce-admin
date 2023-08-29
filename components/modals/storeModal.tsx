'use client';

import {useState} from 'react';
import * as z from 'zod';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {zodResolver} from '@hookform/resolvers/zod';

import {useStoreModal} from '@/hooks/useStoreModal';
import {Modal} from '@/components/ui/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

const storeFormSchema = z.object({
  name: z.string().min(1),
});

type StoreFormType = z.infer<typeof storeFormSchema>;

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<StoreFormType>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: StoreFormType) => {
    console.log(values);
    try {
      setIsLoading(true);
      const response = await axios.post('/api/stores', values);
      console.log('response: ', response.data);
      toast.success('Store Created.');
    } catch (error) {
      console.log('## StoreModal ##', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={'Create Store'}
      description={'Add store to manage products'}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='E-commerce'
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className='pt-6 space-x-2 flex items-center justify-end'>
                <Button variant={'outline'} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type='submit' disabled={isLoading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
