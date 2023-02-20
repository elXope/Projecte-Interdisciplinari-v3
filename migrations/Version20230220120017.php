<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230220120017 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE tasca (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, nom VARCHAR(20) NOT NULL, descripcio VARCHAR(255) DEFAULT NULL, timestamp DATE NOT NULL, fet TINYINT(1) NOT NULL, color VARCHAR(255) NOT NULL, INDEX IDX_6B389ED7A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE tasca ADD CONSTRAINT FK_6B389ED7A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tasca DROP FOREIGN KEY FK_6B389ED7A76ED395');
        $this->addSql('DROP TABLE tasca');
    }
}
