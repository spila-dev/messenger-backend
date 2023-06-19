import { Contact } from "~/types";

import { oneContactAssertionInitializer } from "@/helpers/assertionInitializers/oneContact";
import { AssertionInitializer } from "@/types";
import { FIELD_TYPE } from "@/variables";

const contactsAssertionInitializer: AssertionInitializer = ({
  equalValue,
  testValue,
}) => {
  equalValue.forEach((contact: Contact) => {
    const responseContact = testValue.find(
      (c: Contact) => c.userId === contact.userId
    );

    expect(responseContact).toBe(FIELD_TYPE.OBJECT);

    oneContactAssertionInitializer({
      equalValue: contact,
      testValue: responseContact,
    });
  });
};

export { contactsAssertionInitializer };
