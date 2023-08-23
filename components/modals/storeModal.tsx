'use client';

import * as z from 'zod';
import {useForm} from 'react-hook-form';
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

  const form = useForm<StoreFormType>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: StoreFormType) => {
    console.log(values);
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
                      <Input placeholder='E-commerce' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className='pt-6 space-x-2 flex items-center justify-end'>
                <Button variant={'outline'}>Cancel</Button>
                <Button type='submit'>Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
