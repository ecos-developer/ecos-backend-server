-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DEFAULT', 'ADMIN', 'DRIVER', 'CUSTOMER');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "CustomerDetail" (
    "user_id" TEXT NOT NULL,
    "binusian_id" TEXT NOT NULL,
    "parent_phone" TEXT NOT NULL,

    CONSTRAINT "CustomerDetail_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserDetail" (
    "user_id" TEXT NOT NULL,
    "profile_image" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "is_admin_approved" BOOLEAN NOT NULL,
    "is_email_verified" BOOLEAN NOT NULL,
    "is_phone_verified" BOOLEAN NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDetail_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "DriverDetail" (
    "user_id" TEXT NOT NULL,
    "vehicle_image" TEXT NOT NULL,
    "vehicle_category" TEXT NOT NULL,
    "vehicle_model" TEXT NOT NULL,
    "vehicle_capacity" INTEGER NOT NULL,
    "vehicle_number_plate" TEXT NOT NULL,
    "payment_id" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverDetail_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "payment_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "Term" (
    "user_id" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "is_agree" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "TermText" (
    "role" "Role" NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TermText_pkey" PRIMARY KEY ("role")
);

-- CreateTable
CREATE TABLE "RealtimeLocation" (
    "user_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "RealtimeLocation_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "DriverOrderHeader" (
    "order_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "time_block_id" TEXT NOT NULL,
    "is_admin_approved" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverOrderHeader_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "CustomerOrderHeader" (
    "customer_order_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "extra_passenger" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerOrderHeader_pkey" PRIMARY KEY ("customer_order_id")
);

-- CreateTable
CREATE TABLE "RoomChat" (
    "order_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_expired" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomChat_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "chat_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "AdminTimeBlock" (
    "time_block_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminTimeBlock_pkey" PRIMARY KEY ("time_block_id")
);

-- CreateTable
CREATE TABLE "PaymentHeader" (
    "customer_payment_id" TEXT NOT NULL,
    "customer_order_id" TEXT NOT NULL,
    "payment_proof_image" TEXT,
    "payment_total" INTEGER NOT NULL,
    "is_admin_approved" BOOLEAN NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentHeader_pkey" PRIMARY KEY ("customer_payment_id")
);

-- CreateTable
CREATE TABLE "RealtimeCustomerEachDayPickup" (
    "pickup_id" TEXT NOT NULL,
    "customer_order_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "is_canceled" BOOLEAN NOT NULL,
    "is_pickup" BOOLEAN NOT NULL,
    "is_arrived" BOOLEAN NOT NULL,
    "start_pickup" TIMESTAMP(3),
    "end_pickup" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RealtimeCustomerEachDayPickup_pkey" PRIMARY KEY ("pickup_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_phone_key" ON "UserDetail"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "DriverDetail_payment_id_key" ON "DriverDetail"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_account_number_key" ON "Payment"("account_number");

-- AddForeignKey
ALTER TABLE "CustomerDetail" ADD CONSTRAINT "CustomerDetail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverDetail" ADD CONSTRAINT "DriverDetail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverDetail" ADD CONSTRAINT "DriverDetail_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("payment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_role_fkey" FOREIGN KEY ("role") REFERENCES "TermText"("role") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealtimeLocation" ADD CONSTRAINT "RealtimeLocation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverOrderHeader" ADD CONSTRAINT "DriverOrderHeader_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverOrderHeader" ADD CONSTRAINT "DriverOrderHeader_time_block_id_fkey" FOREIGN KEY ("time_block_id") REFERENCES "AdminTimeBlock"("time_block_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOrderHeader" ADD CONSTRAINT "CustomerOrderHeader_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "DriverOrderHeader"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOrderHeader" ADD CONSTRAINT "CustomerOrderHeader_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomChat" ADD CONSTRAINT "RoomChat_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "DriverOrderHeader"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "RoomChat"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminTimeBlock" ADD CONSTRAINT "AdminTimeBlock_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHeader" ADD CONSTRAINT "PaymentHeader_customer_order_id_fkey" FOREIGN KEY ("customer_order_id") REFERENCES "CustomerOrderHeader"("customer_order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealtimeCustomerEachDayPickup" ADD CONSTRAINT "RealtimeCustomerEachDayPickup_customer_order_id_fkey" FOREIGN KEY ("customer_order_id") REFERENCES "CustomerOrderHeader"("customer_order_id") ON DELETE CASCADE ON UPDATE CASCADE;
