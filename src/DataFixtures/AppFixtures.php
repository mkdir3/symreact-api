<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Set faker to fake french datas
        $faker = Factory::create('fr_FR');
        // Create 30 Customers
        for($c = 0; $c< 30; $c++) {
            $customer = new Customer();
            $customer->setFirstName($faker->firstName)
                     ->setLastName($faker->lastName)
                     ->setCompany($faker->company)
                     ->setEmail($faker->email);

            $manager->persist($customer);
        // For each customer, make invoices between 3 to 10
            for($i= 0; $i < mt_rand(3, 10); $i++) {
                $invoice = new Invoice();
                $invoice->setAmount($faker->randomFloat(2, 250, 14500))
                        ->setSentAt($faker->dateTimeBetween('-6months'))
                        ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELLED']))
                        ->setCustomer($customer);

                $manager->persist($invoice);
            }
        }

        $manager->flush();
    }
}
