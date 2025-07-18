"use client";

import classNames from "classnames";
import { MdLocalPhone } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import ContactForm from "./ContactForm/ContactForm";
import style from "./styleContactsPage.module.css";
import ContactCard from "./ContactCard/ContactCard";

import { api } from "@/api/api";
import TitleHeader from "@/utils/TitleHeader/TitleHeader";
interface fieldsContact {
  firstName: string;
  lastName: string;
  subject: string;
  body: string;
}
export default function ContactsPage() {
  const [contactData, setContactData] = useState<fieldsContact>({
    firstName: "",
    lastName: "",
    subject: "",
    body: "",
  });

  const cardContact = [
    {
      title: "Call us",
      icon: <MdLocalPhone />,
      subtitle:
        "Give us a call to speak directly with our team and get your questions answered.",
      details: "0(24) 456 789",
    },
    {
      title: "Visit us",
      icon: <FaMapMarkerAlt />,
      subtitle:
        "Stop by our office to meet our team in person and discover what we can do for you.",
      details: "123 Innovation Lane, Tech City",
    },
    {
      title: "write us",
      icon: <BiLogoGmail />,
      subtitle:
        "Send us a message, and we’ll get back to you as soon as possible to discuss your needs.",
      details: "hitech2@gmail.com",
    },
  ];
  const handleFields = (
    data: fieldsContact | ((prev: fieldsContact) => fieldsContact),
  ) => {
    setContactData(data);
  };
  const handleSubmit = async () => {
    const { firstName, lastName, subject, body } = contactData;

    if (!firstName || !lastName || !subject || !body) {
      toast.error("Field cannot be empty");

      return;
    }

    const data = { firstName, lastName, subject, body };

    try {
      const response = await api.post("contacts/send", data);

      toast.success("Message sent successfully!");

      return response.data;
    } catch (error) {
      toast.error("Error sending message");
    }
  };

  return (
    <section className={classNames(style["section-contacts"])}>
      <Toaster position="bottom-right" />
      <TitleHeader text="Contacts" />
      <section className={classNames(style["section-contacts__wrapper"])}>
        <section className={classNames(style["section-contacts__left"])}>
          <ContactForm
            handleInputs={handleFields}
            handleSubmit={handleSubmit}
          />
        </section>
        <section className={classNames(style["section-contacts__right"])}>
          {cardContact.map((item, index) => (
            <ContactCard key={index} props={item} />
          ))}
        </section>
      </section>
    </section>
  );
}
