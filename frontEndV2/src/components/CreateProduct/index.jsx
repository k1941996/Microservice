import { createProduct } from '@api/productAPI';
import FormField from '@components/InputComponents/FormField';
import { Button } from '@shadcn/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/components/ui/dialog';
import { SidebarMenuButton } from '@shadcn/components/ui/sidebar';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import { Form, Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'sonner';

const CreateProductDialog = () => {
  const initialValues = {
    name: 'Cookies',
    description: 'chocolate chip cookies',
    price: 500,
    stock: 10,
    category: 'food',
  };
  const [open, setOpen] = useState(false);

  const product = ['name', 'description', 'price', 'stock', 'category'];

  const submit = async (values, actions) => {
    try {
      console.log(values);
      const res = await createProduct(values);
      toast.success(res.data.message);
      setOpen(false);
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip="Quick Create"
          onClick={() => {
            setOpen(true);
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-secondary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
        >
          <IconCirclePlusFilled />
          <span>Create Product</span>
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <Formik initialValues={initialValues} onSubmit={submit}>
          <Form>
            {product.map((e) => (
              <FormField key={e} name={e} placeholder={e} label={e} />
            ))}
            <DialogFooter className="sm:justify-start">
              <div className="flex flex-1 justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="ghost" className={`cursor-pointer`}>
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" variant="default" className={`cursor-pointer`}>
                  Create
                </Button>
              </div>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
