import React from "react";

const Contact = () => {
  return (
    <div className="mt-16 mb-20 max-w-3xl">
      <div className="flex flex-col items-start w-max mb-6">
        <p className="text-2xl font-medium uppercase">Contact</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <p className="text-gray-600 mb-4">
        For order, delivery, and account support, reach out to our team.
      </p>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-medium">Email:</span> support@greencart.local
        </p>
        <p>
          <span className="font-medium">Phone:</span> +91-00000-00000
        </p>
        <p>
          <span className="font-medium">Hours:</span> Mon-Sat, 9:00 AM - 7:00 PM
        </p>
      </div>
    </div>
  );
};

export default Contact;
