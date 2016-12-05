import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int price = s.nextInt();
    int amount = s.nextInt();
    int change = amount - price;

    System.out.println(change);
  }
}
